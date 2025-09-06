import { Section } from '@/components/Section';
import styles from '@/components/Skeletons/Skeleton.module.scss';

const TariffsSkeleton = () => (
    <Section container="sm" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
            <div className={styles.skeleton} style={{ height: '40px', width: '300px', marginBottom: '16px' }} />
            <div className={styles.skeleton} style={{ height: '24px', width: '450px' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div className={styles.skeleton} style={{ height: '450px' }} />
            <div className={styles.skeleton} style={{ height: '450px' }} />
            <div className={styles.skeleton} style={{ height: '450px' }} />
        </div>
    </Section>
);

export { TariffsSkeleton };